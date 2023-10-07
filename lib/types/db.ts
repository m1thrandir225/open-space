export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          created_at: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      contributors: {
        Row: {
          approved: boolean
          created_at: string
          id: string
          project_id: string
          user_id: string
        }
        Insert: {
          approved: boolean
          created_at?: string
          id?: string
          project_id: string
          user_id: string
        }
        Update: {
          approved?: boolean
          created_at?: string
          id?: string
          project_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "contributors_project_id_fkey"
            columns: ["project_id"]
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contributors_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      likes: {
        Row: {
          created_at: string
          id: string
          projcet_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          projcet_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          projcet_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "likes_projcet_id_fkey"
            columns: ["projcet_id"]
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "likes_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      messages: {
        Row: {
          from_user: string
          id: string
          messeges: string
          sent_at: string
          to_user: string
        }
        Insert: {
          from_user: string
          id?: string
          messeges: string
          sent_at?: string
          to_user: string
        }
        Update: {
          from_user?: string
          id?: string
          messeges?: string
          sent_at?: string
          to_user?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_from_user_fkey"
            columns: ["from_user"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_to_user_fkey"
            columns: ["to_user"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          id: string
          status: string | null
          username: string | null
        }
        Insert: {
          id: string
          status?: string | null
          username?: string | null
        }
        Update: {
          id?: string
          status?: string | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      projectCategories: {
        Row: {
          category_id: string
          created_at: string
          id: string
          project_id: string
        }
        Insert: {
          category_id: string
          created_at?: string
          id?: string
          project_id: string
        }
        Update: {
          category_id?: string
          created_at?: string
          id?: string
          project_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "projectCategories_category_id_fkey"
            columns: ["category_id"]
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projectCategories_project_id_fkey"
            columns: ["project_id"]
            referencedRelation: "projects"
            referencedColumns: ["id"]
          }
        ]
      }
      projects: {
        Row: {
          created_at: string
          description: string
          expertise: Database["public"]["Enums"]["expertise"]
          id: string
          image: string
          links: Json
          name: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description: string
          expertise: Database["public"]["Enums"]["expertise"]
          id?: string
          image: string
          links: Json
          name: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string
          expertise?: Database["public"]["Enums"]["expertise"]
          id?: string
          image?: string
          links?: Json
          name?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "projects_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      projectTags: {
        Row: {
          created_at: string
          id: string
          project_id: string | null
          tag_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          project_id?: string | null
          tag_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          project_id?: string | null
          tag_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "projectTags_project_id_fkey"
            columns: ["project_id"]
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projectTags_tag_id_fkey"
            columns: ["tag_id"]
            referencedRelation: "tags"
            referencedColumns: ["id"]
          }
        ]
      }
      tagCategories: {
        Row: {
          categori_id: string
          created_at: string
          id: string
          tag_id: string
        }
        Insert: {
          categori_id: string
          created_at?: string
          id?: string
          tag_id: string
        }
        Update: {
          categori_id?: string
          created_at?: string
          id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tagCategories_categori_id_fkey"
            columns: ["categori_id"]
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tagCategories_tag_id_fkey"
            columns: ["tag_id"]
            referencedRelation: "tags"
            referencedColumns: ["id"]
          }
        ]
      }
      tags: {
        Row: {
          created_at: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      userTags: {
        Row: {
          created_at: string
          id: string
          tag_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          tag_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          tag_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "userTags_tag_id_fkey"
            columns: ["tag_id"]
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "userTags_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      expertise: "BEGINNER" | "INTERMEDIATE" | "ADVANCED"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
