"""
Test Suite for Diagonal Difference — Iterative & Recursive
"""

import sys
sys.path.insert(0, '/home/claude')

from diagonal_iterative  import diagonal_difference_iterative
from diagonal_recursive  import diagonal_difference_recursive

def run_tests():
    test_cases = [
        # (matrix, expected_output, description)
        (
            [[1, 2, 3],
             [4, 5, 6],
             [9, 8, 9]],
            2,
            "Example from problem statement"
        ),
        (
            [[11,  2,  4],
             [ 4,  5,  6],
             [10,  8, -12]],
            15,
            "Sample Input from problem"
        ),
        (
            [[1]],
            0,
            "1x1 matrix"
        ),
        (
            [[ 1,  2],
             [ 3,  4]],
            0,      # LTR=1+4=5, RTL=2+3=5 → |5-5|=0
            "2x2 matrix, difference = 0"
        ),
        (
            [[-1, -2, -3],
             [-4, -5, -6],
             [-7, -8, -9]],
            0,      # LTR=-1-5-9=-15, RTL=-3-5-7=-15 → 0
            "All-negative matrix"
        ),
        (
            [[1, 0, 0, 0],
             [0, 1, 0, 0],
             [0, 0, 1, 0],
             [0, 0, 0, 1]],
            4,      # LTR=4, RTL=0 → 4
            "Identity matrix 4x4"
        ),
    ]

    passed = 0
    failed = 0

    print("=" * 60)
    print("           DIAGONAL DIFFERENCE — TEST RESULTS")
    print("=" * 60)

    for matrix, expected, desc in test_cases:
        iter_result = diagonal_difference_iterative(matrix)
        rec_result  = diagonal_difference_recursive(matrix)

        ok_iter = iter_result == expected
        ok_rec  = rec_result  == expected

        status = "✅ PASS" if (ok_iter and ok_rec) else "❌ FAIL"
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

if __name__ == "__main__":
    run_tests()
