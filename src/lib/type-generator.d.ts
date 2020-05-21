
type Type = {
  name: string,
  att: Name[],
  id: number
}

type Name = {
  type: Value | number,
  optional: boolean,
  array: boolean
}

type Value = "string" | "number" | "boolean" | "null" | "any"