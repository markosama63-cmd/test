"""
Diagonal Difference - Iterative Solution
Time Complexity: O(n)
Space Complexity: O(1)
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


def diagonal_difference_iterative(arr, verbose=False):
    """
    Calculate the absolute difference between the sums of the two diagonals
    of a square matrix using an iterative approach.

    Parameters:
        arr     (list of list of int): n x n square matrix
        verbose (bool): if True, print step-by-step details

    Returns:
        int: absolute difference between the two diagonal sums
    """
    validate_matrix(arr)
    n = len(arr)
    left_to_right_sum = 0   # Main diagonal:  arr[i][i]
    right_to_left_sum = 0   # Anti-diagonal:  arr[i][n-1-i]

    if verbose:
        print("  Step-by-step calculation:")
        print(f"  {'Row':<6} {'Main diag arr[i][i]':<25} {'Anti diag arr[i][n-1-i]'}")
        print("  " + "-" * 58)

    for i in range(n):
        main_val = arr[i][i]
        anti_val = arr[i][n - 1 - i]
        left_to_right_sum += main_val
        right_to_left_sum += anti_val

        if verbose:
            print(f"  {i:<6} +{main_val:<24} +{anti_val}")

    if verbose:
        print("  " + "-" * 58)
        print(f"  {'Total':<6} {left_to_right_sum:<25} {right_to_left_sum}")
        print(f"\n  |{left_to_right_sum} - {right_to_left_sum}| = {abs(left_to_right_sum - right_to_left_sum)}")

    return abs(left_to_right_sum - right_to_left_sum)


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
    print("       Diagonal Difference — Iterative")
    print("=" * 55)

    arr = read_matrix()
    print_matrix(arr)

    result = diagonal_difference_iterative(arr, verbose=True)

    print("\n" + "=" * 55)
    print(f"  Absolute Diagonal Difference: {result}")
    print("=" * 55)


if __name__ == "__main__":
    main()
