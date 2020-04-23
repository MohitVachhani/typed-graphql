import { ClassType, ObjectType, Field } from "type-graphql";

export function Edge<TNodeType>(NodeType: ClassType<TNodeType>) {
  @ObjectType({ isAbstract: true })
  abstract class EdgeType {
    @Field(() => NodeType)
    node: TNodeType;
    @Field()
    cursor: string;
  }
  return EdgeType;
}
