"""
Diagonal Difference - Recursive Solution
Time Complexity: O(n)
Space Complexity: O(n) — call stack depth
"""


def validate_matrix(arr):
    """Check that the matrix is square and non-empty."""
    if not arr:
        raise ValueError("Matrix cannot be empty.")
    n = len(arr)
    for i, row in enumerate(arr):
        if len(row) != n:
            raise ValueError(
                f"Row {i} has {len(row)} elements — expected {n} (matrix must be square)."
            )


def print_matrix(arr):
    """Pretty-print the matrix with row/column indices."""
    n = len(arr)
    col_width = max(len(str(arr[i][j])) for i in range(n) for j in range(n)) + 2

    print("\n  Matrix:")
    header = "    " + "".join(f"[{j}]".center(col_width) for j in range(n))
    print(header)
    print("    " + "-" * (col_width * n))
    for i, row in enumerate(arr):
        row_str = "".join(str(v).center(col_width) for v in row)
        print(f"[{i}] {row_str}")
    print()


def diagonal_difference_recursive(arr, i=0, ltr_sum=0, rtl_sum=0, verbose=False):
    """
    Calculate the absolute difference between the sums of the two diagonals
    of a square matrix using a recursive approach.

    Parameters:
        arr      (list of list of int): n x n square matrix
        i        (int): current row/column index (default 0)
        ltr_sum  (int): accumulated left-to-right diagonal sum
        rtl_sum  (int): accumulated right-to-left diagonal sum
        verbose  (bool): if True, print each recursive call's step

    Returns:
        int: absolute difference between the two diagonal sums
    """
    n = len(arr)

    # Base case: all rows processed
    if i == n:
        if verbose:
            print("  " + "-" * 58)
            print(f"  {'Total':<6} {ltr_sum:<25} {rtl_sum}")
            print(f"\n  |{ltr_sum} - {rtl_sum}| = {abs(ltr_sum - rtl_sum)}")
        return abs(ltr_sum - rtl_sum)

    main_val = arr[i][i]
    anti_val = arr[i][n - 1 - i]

    if verbose:
        if i == 0:
            print("  Step-by-step recursive calls:")
            print(f"  {'Row':<6} {'Main diag arr[i][i]':<25} {'Anti diag arr[i][n-1-i]'}")
            print("  " + "-" * 58)
        new_ltr = ltr_sum + main_val
        new_rtl = rtl_sum + anti_val
        print(f"  {i:<6} +{main_val:<5} (running: {new_ltr:<17}) +{anti_val:<5} (running: {new_rtl})")

    # Recursive case: add current diagonal elements and advance
    return diagonal_difference_recursive(
        arr,
        i + 1,
        ltr_sum + main_val,
        rtl_sum + anti_val,
        verbose,
    )


def read_matrix():
    """Read and validate a matrix from stdin."""
    while True:
        try:
            n = int(input("Enter matrix size n (n >= 1): "))
            if n < 1:
                print("  Error: n must be at least 1. Try again.")
                continue
            break
        except ValueError:
            print("  Error: please enter a valid integer.")

    arr = []
    print(f"Enter {n} rows of {n} space-separated integers:")
    for i in range(n):
        while True:
            try:
                row = list(map(int, input(f"  Row {i}: ").split()))
                if len(row) != n:
                    print(f"  Error: expected {n} values, got {len(row)}. Try again.")
                    continue
                arr.append(row)
                break
            except ValueError:
                print("  Error: please enter integers only.")
    return arr


def main():
    print("=" * 55)
    print("       Diagonal Difference — Recursive")
    print("=" * 55)

    arr = read_matrix()
    print_matrix(arr)

    result = diagonal_difference_recursive(arr, verbose=True)

    print("\n" + "=" * 55)
    print(f"  Absolute Diagonal Difference: {result}")
    print("=" * 55)


if __name__ == "__main__":
    main()
