def twoSum(nums, target):

    # Store number as the key and its index as the value
    num_to_index = {}

    for i, num in enumerate(nums):
        complement = target - num

        if complement in num_to_index:
            return [num_to_index[complement], i]

        num_to_index[num] = i

if __name__ == "__main__":
    print(twoSum([1,3,5,6,2,4], 6))
    print(twoSum([24,50,22,52,35], 72))
    
