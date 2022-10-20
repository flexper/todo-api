import { Arg, Authorized, Mutation, Query, Resolver } from 'type-graphql-v2-fork';
import { NotFound } from 'unify-errors';
import { TodoStatus } from '../../../prisma/client';
import { User } from '../../../prisma/type-graphql';
import { CurrentUser } from '../../services/graphql/user';
import { Todo, TodoCreate, TodoUpdate } from './Todo';

@Resolver()
export class TodoResolver {
  @Authorized()
  @Query(() => [Todo])
  async getTodos(@CurrentUser() user: User): Promise<Todo[]> {
    return prisma.todo.findMany({
      where: {
        ownerId: user.id,
        status: {
          not: TodoStatus.DONE,
        },
      },
    });
  }

  @Authorized()
  @Query(() => Todo)
  async getTodoById(@CurrentUser() user: User, @Arg('todoId', () => String) todoId: string): Promise<Todo> {
    const todo = await prisma.todo.findFirst({
      where: {
        id: todoId,
        ownerId: user.id,
      },
    });

    if (!todo) {
      throw new NotFound({
        error: 'Todo not found',
      });
    }

    return todo;
  }

  @Authorized()
  @Mutation(() => Todo)
  async createTodo(
    @CurrentUser() user: User,
    @Arg('todoCreate', () => TodoCreate) todoCreate: TodoCreate,
  ): Promise<Todo> {
    return prisma.todo.create({
      data: {
        ...todoCreate,
        ownerId: user.id,
      },
    });
  }

  @Authorized()
  @Mutation(() => Todo)
  async updateTodo(
    @CurrentUser() user: User,
    @Arg('todoId', () => String) todoId,
    @Arg('todoUpdate', () => TodoUpdate) todoUpdate: TodoUpdate,
  ): Promise<Todo> {
    const todo = await prisma.todo.findFirst({
      where: {
        id: todoId,
        ownerId: user.id,
      },
    });

    if (!todo) {
      throw new NotFound({
        error: 'Todo not found',
      });
    }

    return prisma.todo.update({
      where: {
        id: todo.id,
      },
      data: {
        ...todoUpdate,
      },
    });
  }

  @Authorized()
  @Mutation(() => Todo)
  async deleteTodo(@CurrentUser() user: User, @Arg('todoId', () => String) todoId): Promise<Todo> {
    const todo = await prisma.todo.findFirst({
      where: {
        id: todoId,
        ownerId: user.id,
      },
    });

    if (!todo) {
      throw new NotFound({
        error: 'Todo not found',
      });
    }

    return prisma.todo.delete({
      where: {
        id: todo.id,
      },
    });
  }
}
