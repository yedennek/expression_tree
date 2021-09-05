const assert = require("assert");

const Node = ({operator="", left=null, right=null}) => {
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
    }
  };

  const toString = function () {
    return `(${left.toString()} ${this.operator} ${right.toString()})`;
  };

  return {
    operator,
    left,
    right,
    result,
    toString
  };
};

const ValueNode = (value) => {
  const result = function () {
    return value;
  };

  const toString = function () {
    return value.toString();
  };

  return {
    value,
    result,
    toString
  };
}

const tree = Node(
  { operator: "÷",
    left: Node(
      {
        operator: "+",
        left: ValueNode(7),
        right: Node(
          {
            operator: "x",
            left: Node(
              { operator: "-",
                left: ValueNode(3),
                right: ValueNode(2)
              }
            ),
            right: ValueNode(5)
          }
        )
      }
    ),
    right: ValueNode(6)
  }
);

assert.strictEqual("((7 + ((3 - 2) x 5)) ÷ 6)", tree.toString());
assert.strictEqual(2, tree.result());
