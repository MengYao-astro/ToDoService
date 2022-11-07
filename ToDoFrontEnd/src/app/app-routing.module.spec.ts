import { Location } from '@angular/common';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { routes } from './app-routing.module';

describe('Router', () => {
  let location: Location;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
      declarations: []
    });

    router = TestBed.get(Router);
    location = TestBed.get(Location);

    router.initialNavigation();
  });

  it('test navigate', fakeAsync(() =>{

  }));

  it('should got todos when navigate ""', fakeAsync(() => {
    // given 
    // when
    router.navigate(['']);
    tick(50);
    // then
    expect(location.path()).toEqual('/todos');
  }));
  it('should got todos when navigate "todos/create"', fakeAsync(() => {
    // given 
    // when
    router.navigate(['/todos/create']);
    tick(50);
    // then
    expect(location.path()).toEqual('/todos/create');
  }));

  it('should got todos item when navigate "/todos/:id"', fakeAsync(() => {
    // given 
    // when
    router.navigate(['/todos/1']);
    tick(50);
    // then
    expect(location.path()).toEqual('/todos/1');
  }));

  it('should got todos item when navigate "/todos/modify/:id"', fakeAsync(() => {
    // given 
    // when
    router.navigate(['/todos/modify/1']);
    tick(50);
    // then
    expect(location.path()).toEqual('/todos/modify/1');
  }));
});
