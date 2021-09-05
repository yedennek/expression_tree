const assert = require("assert");

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

const SubtractionNode = ({ left=null, right=null}) => {
  const result = function () {
    return left.result() - right.result();
  };

  const toString = function () {
    return `(${left.toString()} - ${right.toString()})`;
  };

  return {
    result,
    toString
  };
}

const AdditionNode = ({ left=null, right=null}) => {
  const result = function () {
    return left.result() + right.result();
  };

  const toString = function () {
    return `(${left.toString()} + ${right.toString()})`;
  };

  return {
    result,
    toString
  };
}

const MultiplicationNode = ({ left=null, right=null}) => {
  const result = function () {
    return left.result() * right.result();
  };

  const toString = function () {
    return `(${left.toString()} x ${right.toString()})`;
  };

  return {
    result,
    toString
  };
}

const DivisionNode = ({ left=null, right=null}) => {
  const result = function () {
    return left.result() / right.result();
  };

  const toString = function () {
    return `(${left.toString()} ÷ ${right.toString()})`;
  };

  return {
    result,
    toString
  };
}

const tree = DivisionNode(
  { left: AdditionNode(
      {
        left: ValueNode(7),
        right: MultiplicationNode(
          {
            left: SubtractionNode( { left: ValueNode(3), right: ValueNode(2) }),
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
