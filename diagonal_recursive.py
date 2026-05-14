"""
Diagonal Difference - Recursive Solution
Time Complexity: O(n)
Space Complexity: O(n) — call stack depth
"""

def diagonal_difference_recursive(arr, i=0, ltr_sum=0, rtl_sum=0):
    """
    Calculate the absolute difference between the sums of the two diagonals
    of a square matrix using a recursive approach.

    Parameters:
        arr      (list of list of int): n x n square matrix
        i        (int): current row/column index (default 0)
        ltr_sum  (int): accumulated left-to-right diagonal sum
        rtl_sum  (int): accumulated right-to-left diagonal sum

    Returns:
        int: absolute difference between the two diagonal sums
    """
    n = len(arr)

    # Base case: all rows processed
    if i == n:
        return abs(ltr_sum - rtl_sum)

    # Recursive case: add current diagonal elements and advance
    return diagonal_difference_recursive(
        arr,
        i + 1,
        ltr_sum + arr[i][i],          # main diagonal element
        rtl_sum + arr[i][n - 1 - i]   # anti-diagonal element
    )


def main():
    print("=" * 45)
    print("   Diagonal Difference — Recursive")
    print("=" * 45)

    n = int(input("Enter matrix size n: "))
    arr = []
    print(f"Enter {n} rows (space-separated integers):")
    for i in range(n):
        row = list(map(int, input().split()))
        arr.append(row)

    result = diagonal_difference_recursive(arr)
    print(f"\nAbsolute Diagonal Difference: {result}")


if __name__ == "__main__":
    main()
