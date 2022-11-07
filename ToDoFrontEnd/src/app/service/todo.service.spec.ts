import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { TodoApiService } from '../api/todo.api.service';
import { ToDoItem } from '../model/ToDoItem';
import { TodoStoreService } from './todo-store.service';
import { TodoService } from './todo.service';

describe('TodoService', () => {

  let service: TodoService;
  let todoStoreService: TodoStoreService;
  let httpClientSpy: any;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post', 'get', 'delete']);
    todoStoreService = new TodoStoreService();
    TestBed.configureTestingModule({
      providers: [
        TodoApiService,
        { provide: HttpClient, useValue: httpClientSpy }
      ]
    });
    service = TestBed.inject(TodoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create todoItem via mockHttp post', () => {
    // given 
    const todoItem = new ToDoItem(9, 'title', 'description', true);
    httpClientSpy.post.and.returnValue(of({}))
    // when
    service.create(todoItem);
    // then
    expect(httpClientSpy.post).toHaveBeenCalledWith(
      'https://localhost:5001/todos', todoItem)
  })

  it('should response error when create failed', () => {
    // given 
    const todoItem = new ToDoItem(9, 'title', 'description', true)
    httpClientSpy.post.and.returnValue(
      throwError(() => ({ errorMessage: 'create failed' }))
    )
    // when
    service.create(todoItem);
    // then
    expect(service.errorMessage).toEqual('create failed')
  });

  it('should find todoItem by id via mockHttp get', () => {
    // given
    const todoItem = new ToDoItem(1, 'title', 'description', true)
    const id = 1;
    httpClientSpy.get.and.returnValue(of({todoItem}))
    // when
    service.findById(id);
    // then
    expect(httpClientSpy.get).toHaveBeenCalledWith(
      'https://localhost:5001/todos/1')
  })

  it('should response error when findById failed', () => {
    // given 
    const id = 1
    httpClientSpy.get.and.returnValue(
      throwError(() => ({ errorMessage: 'not found' }))
    )
    // when
    service.findById(id)
    // then
    expect(service.errorMessage).toEqual('create failed')
  });


  it('should delete via mockHttp delete', () => {
    // given 
    httpClientSpy.delete.and.returnValue(of({}))
    // when
    service.delete(1)
    // then
    expect(httpClientSpy.delete).toHaveBeenCalledWith(
      'https://localhost:5001/todos/1')
  });

  it('should response error when delete failed ', () => {
    // given
    httpClientSpy.delete.and.returnValue(
      throwError(() => ({ errorMessage: 'delete failed' }))
    );
    // when
    service.delete(1);
    // then
    expect(service.errorMessage).toEqual('delete failed');
  });

})
