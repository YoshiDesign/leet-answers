function accountsMerge(accounts: string[][]): string[][] {
    let all_accounts: Record<string, string[]> = {};

    accounts.forEach( (account: string[]) => {
        if (account_exists(account, all_accounts)) {
            // Merge Emails
        }
        else {
            all_accounts[account[0]] = account.slice(1)
        }
    })

    return [[""]]
};

function account_exists(account: string[], all_accounts: Record<string, string[]>) {

    let account_name: string = account[0]
    let account_emails: string[] = account.slice(1)

    if (account_name in Object.keys(all_accounts)) {
        console.log("Pre-Existing Name: ", account_name)
        /**
         * Compare existing emails to the incoming account's emails
         */
        let existing_emails = all_accounts[account_name]

        let same_account: boolean = account_emails.some( (email:string) => {
            return existing_emails.includes(email)
        });

        // It's the same account, return the same key
        if (same_account) {
            return account_name
        }
        // Check how many times this name appears already so we can add another account to our all_accounts Object
        else {
            let names = Object.keys(all_accounts)

            // Get an array of all of the names without our unique suffixes
            let all_names = names.map( (name: string) => {
                return name.split("_")[0]
            })

            // Count how many times this name has already appeared
            const n = all_names.filter( (name: string) => {name === account_name}).length

            // Add a unique suffix and return the key
            return account_name + "_copy_" + String(n)
        }
    }

    console.log("New Name: ", account_name)
    // The incoming account's name is new, it cannot exist already
    return false
}