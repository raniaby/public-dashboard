import { Injectable } from '@nestjs/common';
import { JsonPlaceholderService } from '../../shared/jsonplaceholder.service';
import { TodoSummary } from '../../shared/types/jsonplaceholder.types';

@Injectable()
export class TodosService {
  constructor(
    private readonly jsonPlaceholderService: JsonPlaceholderService,
  ) {}

  async getTodosSummary(): Promise<{
    data: TodoSummary[];
    meta: {
      total: number;
      completed: number;
      incomplete: number;
      completionRate: number;
    };
  }> {
    const todos = await this.jsonPlaceholderService.getTodos();
    const todosByUser = new Map<number, TodoSummary>();

    let totalCompleted = 0;
    const totalTodos = todos.length;

    for (const todo of todos) {
      if (!todosByUser.has(todo.userId)) {
        todosByUser.set(todo.userId, {
          userId: todo.userId,
          total: 0,
          completed: 0,
          incomplete: 0,
          completionPercentage: 0,
        });
      }

      const summary = todosByUser.get(todo.userId)!;
      summary.total++;
      if (todo.completed) {
        summary.completed++;
        totalCompleted++;
      } else {
        summary.incomplete++;
      }
      summary.completionPercentage = Number(
        ((summary.completed / summary.total) * 100).toFixed(2),
      );
    }

    const totalIncomplete = totalTodos - totalCompleted;
    const completionRate =
      totalTodos > 0
        ? Number(((totalCompleted / totalTodos) * 100).toFixed(2))
        : 0;

    return {
      data: Array.from(todosByUser.values()),
      meta: {
        total: totalTodos,
        completed: totalCompleted,
        incomplete: totalIncomplete,
        completionRate,
      },
    };
  }
}
