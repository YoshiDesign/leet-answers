def isValid(s: str) -> bool:
    """
        Using a stack to validate opening/closing brackets/parens
    """
    bracket_map = {'}': '{', ')':'(', ']':'['}

    stack = []

    for char in s:
        if char in bracket_map:
            #look for a corresponding opening bracket
            top_element = stack.pop() if stack else "#"
            if bracket_map[char] != top_element:
                return False

        else:
            stack.append(char)

    # The string is valid if the stack is empty by the end
    return not stack


if __name__ == "__main__":
    print(isValid("()[]{}"))
    print(isValid("{[]}"))
    print(isValid("{[}]"))
    
