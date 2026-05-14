"""
Diagonal Difference — Main Program
Integrates: iterative solution, recursive solution, and test suite
"""

from diagonal_iterative import diagonal_difference_iterative
from diagonal_recursive import diagonal_difference_recursive


# ── Test Suite ────────────────────────────────────────────────────────────────

def run_tests():
    test_cases = [
        ([[1, 2, 3], [4, 5, 6], [9, 8, 9]],             2,  "Example from problem statement"),
        ([[11, 2, 4], [4, 5, 6], [10, 8, -12]],         15,  "Sample Input from problem"),
        ([[1]],                                           0,  "1x1 matrix"),
        ([[1, 2], [3, 4]],                               0,  "2x2 matrix, difference = 0"),
        ([[-1, -2, -3], [-4, -5, -6], [-7, -8, -9]],    0,  "All-negative matrix"),
        ([[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]],      4,  "Identity matrix 4x4"),
    ]

    passed = failed = 0

    print("=" * 60)
    print("        DIAGONAL DIFFERENCE — TEST RESULTS")
    print("=" * 60)

    for matrix, expected, desc in test_cases:
        iter_result = diagonal_difference_iterative(matrix)
        rec_result  = diagonal_difference_recursive(matrix)

        ok_iter = iter_result == expected
        ok_rec  = rec_result  == expected
        status  = "✅ PASS" if (ok_iter and ok_rec) else "❌ FAIL"

        if ok_iter and ok_rec:
            passed += 1
        else:
            failed += 1

        print(f"\n{status} | {desc}")
        print(f"       Expected : {expected}")
        print(f"       Iterative: {iter_result}  {'✓' if ok_iter else '✗'}")
        print(f"       Recursive: {rec_result}   {'✓' if ok_rec  else '✗'}")

    print("\n" + "=" * 60)
    print(f"  Results: {passed} passed, {failed} failed out of {len(test_cases)} tests")
    print("=" * 60)
    return failed == 0


# ── Manual Input ──────────────────────────────────────────────────────────────

def get_matrix_from_user():
    n = int(input("Enter matrix size n: "))
    arr = []
    print(f"Enter {n} rows (space-separated integers):")
    for i in range(n):
        row = list(map(int, input(f"  Row {i+1}: ").split()))
        while len(row) != n:
            print(f"  ⚠️  Expected {n} integers, got {len(row)}. Try again.")
            row = list(map(int, input(f"  Row {i+1}: ").split()))
        arr.append(row)
    return arr


def show_results(arr):
    iter_result = diagonal_difference_iterative(arr)
    rec_result  = diagonal_difference_recursive(arr)
    print(f"\n  Iterative result : {iter_result}")
    print(f"  Recursive result : {rec_result}")
    if iter_result == rec_result:
        print(f"\n  ✅ Both methods agree: Absolute Diagonal Difference = {iter_result}")
    else:
        print(f"\n  ❌ Results differ! (should never happen)")


# ── Main Menu ─────────────────────────────────────────────────────────────────

def main():
    print("=" * 50)
    print("       DIAGONAL DIFFERENCE PROGRAM")
    print("=" * 50)
    print("\nChoose an option:")
    print("  1. Run all tests")
    print("  2. Enter a matrix manually")
    print("  3. Run tests then enter a matrix")
    print("  0. Exit")

    choice = input("\nYour choice: ").strip()

    if choice == "1":
        run_tests()

    elif choice == "2":
        print()
        arr = get_matrix_from_user()
        show_results(arr)

    elif choice == "3":
        all_passed = run_tests()
        if all_passed:
            print("\n✅ All tests passed. Now enter your own matrix:\n")
            arr = get_matrix_from_user()
            show_results(arr)

    elif choice == "0":
        print("Goodbye!")

    else:
        print("❌ Invalid choice.")


if __name__ == "__main__":
    main()
