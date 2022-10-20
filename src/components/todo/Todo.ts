import { ObjectType, Field, InputType } from 'type-graphql-v2-fork';
import { TodoStatus } from '../../../prisma/type-graphql/enums';
import { TodoCreateInput } from '../../../prisma/type-graphql';

@ObjectType('Todo', {
  isAbstract: true,
})
export class Todo {
  @Field(() => String, {
    nullable: false,
  })
  id!: string;

  @Field(() => String, {
    nullable: false,
  })
  text!: string;

  @Field(() => TodoStatus, {
    nullable: true,
  })
  status?: 'WIP' | 'DONE' | undefined;
}

@InputType()
export class TodoCreate implements Partial<TodoCreateInput> {
  @Field(() => String, {
    nullable: false,
  })
  text!: string;

  @Field(() => TodoStatus, {
    nullable: true,
  })
  status?: 'WIP' | 'DONE' | undefined;
}

@InputType()
export class TodoUpdate extends TodoCreate {}

export enum TodoActions {
  INCREMENT = 'increment',
  DECREMENT = 'decrement',
}
