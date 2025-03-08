function accountsMerge(accounts: string[][]): string[][] {
    let all_accounts: Record<string, string[]> = {};

    accounts.forEach( (account: string[]) => {
        if (account_exists(account, all_accounts)) {
            // Merge Emails
        }
        else {
            
        }
    })

    return [[""]]
};

function account_exists(account: string[], all_accounts: Record<string, string[]>) {

    let account_name: string = account[0]
    let account_emails: string[] = account.slice(1)

    if (account_name in Object.keys(all_accounts)) {
        /**
         * Compare existing emails to the incoming account's
         */
        let existing_emails = all_accounts[account_name]

        return account_emails.some( (email:string) => {
            return existing_emails.includes(email)
        });
    }

    // The incoming account's name is new, it cannot exist already
    return false
}