export interface ICategory {
  _id: string | number;
  name: string;
  slug: string;
  parentId?: string | number;
  image?: string;
  description?: string;
  isActive: boolean;
  children?: ICategory[];
  subCategories?: ISubCategory[];
}

export interface ISubCategory extends ICategory {
  parentId: string | number;
}

export interface IBrand {
  _id: string | number;
  name: string;
  slug: string;
  logoUrl?: string;
  isActive: boolean
}