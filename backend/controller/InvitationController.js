const {v4: UUIDv4} = require('uuid');
const UserModel = require('../db/model/UserModel');
const UserInvitationModel = require('../db/model/UserInvitationModel');
const InvitationMail = require('../mail/InvitationMail');

class InvitationController {

    constructor(session) {
        this.session = session;
    }

    async create(email) {
        if (await UserModel.findOne({email}).exec()) {
            return CreationErrors.userExists;
        }
        if (await UserInvitationModel.findOne({email}).exec()) {
            return CreationErrors.invitationExists;
        }
        const newInvitation = await UserInvitationModel.create({email, registrationKey: UUIDv4()});
        const confirmUrl = process.env.FRONTEND_URL + '/invite/confirm?email=' + encodeURIComponent(newInvitation.email)
            + '&registrationKey=' + encodeURIComponent(newInvitation.registrationKey);
        const emailSuccess = new InvitationMail(email, confirmUrl).send()
        if (!emailSuccess) {
            await newInvitation.remove();
            return CreationErrors.sendEmailFailed;
        }
        return null;
    }

    async delete(email) {
        return !!(await UserInvitationModel.findOneAndDelete({email}).exec());
    }

    async list() {
        return await UserInvitationModel.find().exec();
    }

    async check(email, registrationKey) {
        const invitation = await UserModel.findOne({email}).exec();
        return invitation && invitation.registrationKey === registrationKey; // todo expire
    }

    async confirm(email, registrationKey, name, password) {
        const invitation = await UserModel.findOne({email}).exec();
        if (!invitation || invitation.registrationKey !== registrationKey) { // todo expire
            return ConfirmationErrors.notFound;
        }

        if (await UserModel.findOne({name}).exec()) {
            return ConfirmationErrors.duplicateName;
        }

        const passwordHash = await bcrypt.hash(password, saltIterations);
        const user = await UserModel.create({email, name, passwordHash});
        this.session.userId = user._id;
        return user;
    }
}


const CreationErrors = {
    userExists: 'User exists',
    invitationExists: 'Invitation exists',
    sendEmailFailed: 'Send email failed'
};

const ConfirmationErrors = {
    notFound: 'not found',
    duplicateName: 'duplicate name'
};

module.exports = {InvitationController, ConfirmationErrors, CreationErrors};
