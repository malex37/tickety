/** @type {import('typedoc').TypeDocOptions} */
module.exports = {
  //entryPoints: ["./src/main/api/index.ts"],
  entryPoints: ["./src/main/exports.ts", "./src/models"],
  out: "doc",
  tsconfig: "./tsconfig.td.json",
  externalSymbolLinkMappings: {
    "@types/react": {
      Component: "https://reactjs.org/docs/react-component.html",
    },
    react: {
      Component: "https://reactjs.org/docs/react-component.html"
    }
  },
  navigation: {
    includeGroups: true,
  },
  entryPointStrategy: "expand",
  categorizeByGroup: true,
  name: "Tickety",
  excludeReferences: true,
  groupOrder: ["API"],
  disableSources: true,
  navigation: {
    fullTree: false,
  },
  blockTags: [],
  hideParameterTypesInTitle: true,
  showConfig: true
};
