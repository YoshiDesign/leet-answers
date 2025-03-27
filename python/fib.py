def main():

    """
    Implementing the well known fibonacci recursive function 
    with the memoization optimization
    """

    print("Running fib_basic...")
    print([fib_basic(n) for n in range(10)])

    print("Running fib_memo...")
    print([fib_memo(n) for n in range(10)])

    print("Running fibs_iter_less_than")
    print(fibs_iter_less_than(22))

    print("Running class strategy...")
    fib = Fibonacci()
    print(fib(15))
    print([fib(n) for n in range(16)])

def fib_basic(n):
    base_nums = {0, 1}

    if n in base_nums:
        return n
    for x in range(n):
        print("#", end='')
    print('')
    return fib_basic(n-1) + fib_basic(n-2)

cache = {0: 0, 1: 1}
def fib_memo(n):

    """ 
    `cache` will be updated each iteration
    and we'll only need to recurse half the time
    """

    if n in cache:
        return cache[n]

    for x in range(n):
        print("#", end="")
    print("")

    cache[n] = fib_memo(n-1) + fib_memo(n-2)
    return cache[n]

def fibs_iter_less_than(n):
    fibs = [0,1]
    next_answer = 1
    while next_answer < n:
        nth = fibs[-1]
        fibs.append(next_answer)
        next_answer = next_answer + nth

    return fibs

# A cleaner approach using a class and the cache optimization 
class Fibonacci:
    def __init__(self):
        self.cache = [0,1, 1]

    def __call__(self, n):
        # validate the value of n
        if not (isinstance(n, int) and n >= 0):
            raise ValueError(f"Positive integer number expected, got {n}")

        if n < len(self.cache):
            # it's already been accounted for
            return self.cache[n]
        else:
            # Compute and cache the requested Fibonacci number
            fib_number = self(n-1) + self(n-2)
            self.cache.append(fib_number)

        return self.cache[n]



if __name__ == "__main__":
    
    main()
