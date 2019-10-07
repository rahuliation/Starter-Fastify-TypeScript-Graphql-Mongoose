export const typeDef = `
  type Category {
    "Category of Product"
    id: ID!
    name: String
    parent: String
  }
  type Query {
    "Get Category List "
    getCategories: [Category]
  }
  type Mutation {
    "Create Category List "
    createCategory(name: String): Category
    updateCategory(id: ID!, name: String): Category
  }
`;

export const resolver = {

}