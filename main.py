"""
Diagonal Difference — Combined Runner
Lets the user choose Iterative or Recursive, shows the matrix,
step-by-step workings, and the final result.
"""

from diagonal_iterative import diagonal_difference_iterative, print_matrix, validate_matrix
from diagonal_recursive import diagonal_difference_recursive


def read_matrix():
    """Read and validate a square matrix from stdin."""
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


def choose_method():
    """Prompt the user to pick a computation method."""
    print("\n  Choose method:")
    print("  [1] Iterative  (O(1) space)")
    print("  [2] Recursive  (O(n) space — call stack)")
    print("  [3] Both       (compare results side-by-side)")
    while True:
        choice = input("\n  Enter 1, 2, or 3: ").strip()
        if choice in ("1", "2", "3"):
            return choice
        print("  Invalid choice. Please enter 1, 2, or 3.")


def run_again():
    """Ask if the user wants to run another matrix."""
    ans = input("\nRun another matrix? (y/n): ").strip().lower()
    return ans == "y"


def main():
    print("=" * 55)
    print("         Diagonal Difference Calculator")
    print("=" * 55)

    while True:
        try:
            arr = read_matrix()
            validate_matrix(arr)
        except ValueError as e:
            print(f"\n  Error: {e}\n")
            continue

        print_matrix(arr)
        choice = choose_method()

        print()

        if choice == "1":
            print("  [ Iterative Method ]")
            result = diagonal_difference_iterative(arr, verbose=True)
            print("\n" + "=" * 55)
            print(f"  Absolute Diagonal Difference: {result}")
            print("=" * 55)

        elif choice == "2":
            print("  [ Recursive Method ]")
            result = diagonal_difference_recursive(arr, verbose=True)
            print("\n" + "=" * 55)
            print(f"  Absolute Diagonal Difference: {result}")
            print("=" * 55)

        else:
            print("  [ Iterative Method ]")
            iter_result = diagonal_difference_iterative(arr, verbose=True)

            print("\n  [ Recursive Method ]")
            rec_result = diagonal_difference_recursive(arr, verbose=True)

            print("\n" + "=" * 55)
            print(f"  Iterative result : {iter_result}")
            print(f"  Recursive result : {rec_result}")
            match = "Match" if iter_result == rec_result else "MISMATCH"
            print(f"  Both methods     : {match}")
            print("=" * 55)

        if not run_again():
            print("\nGoodbye!")
            break


if __name__ == "__main__":
    main()
