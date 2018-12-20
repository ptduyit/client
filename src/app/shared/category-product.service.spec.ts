import { TestBed } from '@angular/core/testing';

import { CategoryProductService } from './category-product.service';

describe('CategoryProductService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CategoryProductService = TestBed.get(CategoryProductService);
    expect(service).toBeTruthy();
  });
});
