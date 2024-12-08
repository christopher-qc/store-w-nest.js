import { Injectable, NotFoundException } from '@nestjs/common';
import { Category } from '../entities/category/category';

@Injectable()
export class CategoryService {
  private counterId = 1;

  private category: Category[] = [
    {
      id: 1,
      name: 'Tecnología',
      description:
        'Categoría que abarca dispositivos electrónicos, software y accesorios.',
      estado: false,
      color: '#007BFF',
      image: 'ruta/a/image.jpg',
    },
    {
      id: 2,
      name: 'Salud',
      description:
        'Categoría que incluye productos y servicios relacionados con el bienestar físico y mental.',
      estado: true,
      color: '#28A745',
      image: 'ruta/a/image2.jpg',
    },
    {
      id: 3,
      name: 'Educación',
      description:
        'Categoría dedicada a herramientas y recursos para el aprendizaje y la enseñanza.',
      estado: true,
      color: '#FFC107',
      image: 'ruta/a/image3.jpg',
    },
    {
      id: 4,
      name: 'Deportes',
      description:
        'Categoría que abarca equipamiento deportivo, ropa y accesorios para el ejercicio.',
      estado: false,
      color: '#DC3545',
      image: 'ruta/a/image4.jpg',
    },
  ];

  findAll(querys) {
    const { limit, page } = querys;
    const pageNumber = Number(page);
    const pageSize = Number(limit);

    const validPage = pageNumber > 0 ? pageNumber : 1;
    const validLimit = pageSize > 0 ? pageSize : 10;

    const startIndex = (validPage - 1) * validLimit;
    const endIndex = validPage * validLimit;

    const categories = this.category.slice(startIndex, endIndex);
    return categories;
  }

  findOne(id: number) {
    const category = this.category.find((c) => c.id === id);
    if (!category) {
      throw new NotFoundException(`category #${id} not found`);
    }
    return category;
  }

  create(payload: any) {
    this.counterId = this.counterId + 1;
    const newCategory = {
      id: this.counterId,
      ...payload,
    };

    this.category.push(newCategory);
    return newCategory;
  }

  updated(id: number, payload: any) {
    const category = this.findOne(id);
    if (!category) {
      throw new NotFoundException(`category #${id} not found`);
    }
    const index = this.category.findIndex((c) => c.id === id);
    this.category[index] = {
      ...category,
      ...payload,
    };
    return this.category[index];
  }

  remove(id: number) {
    const category = this.findOne(id);
    if (!category) {
      throw new NotFoundException(`category #${id} not found`);
    }
    const index = this.category.findIndex((c) => c.id === id);
    this.category.splice(index, 1);
    return category;
  }
}

export default CategoryService;
