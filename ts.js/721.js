/**
 * @param {string[][]} accounts
 * @return {string[][]}
 * Algo : 
 * - Find out which arrays contain duplicates and map them first
 * - - e.g. [[1,3],[2,7],[4,5,6]]
 * - Merge the mapped arrays, sort, and finally prepend the account name
 * - Win

 * You are here:
 * Make duplicates an object
    e.g.
    {
        0: [1,2,3,4] // 0 has duplicates in 1,2,3 and 4
                     // that way we'll skip a duplicate search in any of its values
    }
 */
var accountsMerge = function(accounts) {

    var solution = []
    var emaps = []
    var already_searched_indexes = []
    var duplicates = []

    // Create a map of indexes that have overlapping emails e.g. [[1,3],[4,7], ...]
    accounts.forEach( (data_1, i) => {

        accounts.forEach( (data_2, j) => {
            
            // Avoid redundant entries
            if (i == j || already_searched_indexes.includes(j)){/*do nothing*/}
            else {
                let scopy_1 = data_1.slice(1)
                let scopy_2 = data_2.slice(1)
                let has_duplicate = scopy_1.some( item => scopy_2.includes(item))

                if (has_duplicate) {
                    duplicates = [...duplicates, [i, j]]
                    console.log(`Duplicate found at ${i} and ${j}`)
                }

                already_searched_indexes.push(i)
            }

        })
    })

    console.log("Duplicates:\n", duplicates)

    // Merge the arrays with duplicate emails found and add them to the solution output
    duplicates.forEach( dup_data => {
        let name = false
        let tmp = []
        let emails = []

        dup_data.forEach( i => {
            emails = [...emails, ...accounts[i].slice(1)]
            if (!name) {
                // Acquire the name
                name = accounts[i][0]
            }

        })

        // Build the solution entry
        tmp = [name, ...emails.sort()]

        // Remove duplicate entries of merged arrays
        tmp = tmp.filter((item, index, self) => self.indexOf(item) === index)
        // While I'm coding for educational purposes, here's another way to perform a unique constraint. 
        // tmp = [...new Set(tmp)] 

        solution.push(tmp)
    })

    let all_duplicates = duplicates.flat()

    // Push the rest of the accounts onto the solution output
    accounts.forEach( (account, i) => {
        if(all_duplicates.includes(i)) {/*Do Nothing*/}
        else {
            // sort the emails
            let name = account[0]
            let emails = account.slice(1).sort()
            solution.push([name, ...new Set(emails)])
        }
    })

    console.log(solution)
    return solution;

};
