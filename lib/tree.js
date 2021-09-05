const assert = require("assert");

const Node = ({operator="", value=null, left=null, right=null}) => {
  const result = function () {
    switch (this.operator) {
      case "+":
        return left.result() + right.result();
      case "-":
        return left.result() - right.result();
      case "x":
        return left.result() * right.result();
      case "÷":
        return left.result() / right.result();
      default:
        return value;
    }
  };

  const toString = function () {
    switch (this.operator) {
      case "+":
        return `(${left.toString()} + ${right.toString()})`;
      case "-":
        return `(${left.toString()} - ${right.toString()})`;
      case "x":
        return `(${left.toString()} x ${right.toString()})`;
      case "÷":
        return `(${left.toString()} ÷ ${right.toString()})`;
      default:
        return value.toString();
    }
  };

  return {
    operator,
    value,
    left,
    right,
    result,
    toString
  };
};

const tree = Node(
  { operator: "÷",
    left: Node(
      {
        operator: "+",
        left: Node({ value: 7 }),
        right: Node(
          {
            operator: "x",
            left: Node(
              { operator: "-",
                left: Node({ value: 3 }),
                right: Node({ value: 2 })
              }
            ),
            right: Node({ value: 5 })
          }
        )
      }
    ),
    right: Node({ value: 6 })
  }
);

assert.strictEqual("((7 + ((3 - 2) x 5)) ÷ 6)", tree.toString());
assert.strictEqual(2, tree.result());
