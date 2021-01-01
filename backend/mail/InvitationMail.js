const getTransport = require('./init');

class InvitationMail {

    constructor(email, url) {
        this.email = email;
        this.url = url;
    }

    async send() {
        try {
            const info = await getTransport().sendMail({
                from: 'RecipeAppReact',
                to: this.email,
                subject: 'You have been invited',
                text: 'Hello,\n' +
                    'you have been invited to RecipeAppReact! Follow this link to confirm your invitation: ' + this.url,
                html: 'Hello,<br>' +
                    'you have been invited to RecipeAppReact! Follow this link to confirm your invitation: <a href="' + this.url + '">Create account</a>',
            });
            console.debug('Invitation mail send to ' + this.email, info);
            return true;
        } catch (error) {
            console.info('Failed to send invitation mail to ' + this.email, error);
            return false;
        }
    }
}

module.exports = InvitationMail;
