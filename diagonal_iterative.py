"""
Diagonal Difference - Iterative Solution
Time Complexity: O(n)
Space Complexity: O(1)
"""

def diagonal_difference_iterative(arr):
    """
    Calculate the absolute difference between the sums of the two diagonals
    of a square matrix using an iterative approach.
    
    Parameters:
        arr (list of list of int): n x n square matrix
    
    Returns:
        int: absolute difference between the two diagonal sums
    """
    n = len(arr)
    left_to_right_sum = 0   # Main diagonal: arr[i][i]
    right_to_left_sum = 0   # Anti diagonal: arr[i][n-1-i]

    for i in range(n):
        left_to_right_sum += arr[i][i]
        right_to_left_sum += arr[i][n - 1 - i]

    return abs(left_to_right_sum - right_to_left_sum)


def main():
    print("=" * 45)
    print("   Diagonal Difference — Iterative")
    print("=" * 45)

    # Read input
    n = int(input("Enter matrix size n: "))
    arr = []
    print(f"Enter {n} rows (space-separated integers):")
    for i in range(n):
        row = list(map(int, input().split()))
        arr.append(row)

    result = diagonal_difference_iterative(arr)
    print(f"\nAbsolute Diagonal Difference: {result}")


if __name__ == "__main__":
    main()
