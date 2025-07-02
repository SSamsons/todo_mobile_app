export interface Todo {
  id: number;
  title: string;
  description: string;
  is_completed: boolean;
  status: string;
  created_at: string;
  updated_at: string;
  category_id?: number;
  priority?: number;
  due_date?: string;
  user_id?: number;
}

export interface Category {
  id: number;
  name: string;
  color?: string;
} 