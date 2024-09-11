import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  "main";

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        label: "Home",
        name: "home",
        path: "src/content/home",
        format: "md",
        match: {
          include: "home",
        },
        fields: [
          {
            type: "string",
            name: "heroText",
            label: "Hero Text",
          },
          {
            type: "string",
            name: "projectsTitle",
            label: "Projects Title",
          },
          {
            type: "string",
            name: "whoWeAreTitle",
            label: "Who We Are Title",
          },
          {
            type: "rich-text",
            name: "whoWeAreText",
            label: "Who We Are Text",
          },
          {
            type: "string",
            name: "contributeTitle",
            label: "Contribute Title",
          },
          {
            type: "rich-text",
            name: "contributeText",
            label: "Contribute Text",
          },
          {
            type: "object",
            name: "principles",
            label: "Principles",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: item.text || "Principles Item",
              }),
            },
            fields: [
              {
                type: "string",
                name: "text",
                label: "Principle Text",
              },
              {
                type: "string",
                name: "pattern",
                label: "Pattern",
                list: true,
              },
            ],
          },
        ],
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
      },
      {
        label: "About",
        name: "aboutPage",
        path: "src/content/about",
        format: "md",
        match: {
          include: "about",
        },
        fields: [
          {
            type: "string",
            label: "Hero Text",
            name: "heroText",
          },
          {
            type: "string",
            label: "Who We Are Title",
            name: "whoWeAreTitle",
          },
          {
            type: "rich-text",
            label: "Who We Are Text",
            name: "whoWeAreText",
          },
          {
            type: "object",
            label: "Who We Are Paragraphs",
            name: "whoWeAreParagraph",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: item.title || "Who We Are Paragraphs Item",
              }),
            },
            fields: [
              {
                type: "string",
                label: "Title",
                name: "title",
              },
              {
                type: "rich-text",
                label: "Text",
                name: "text",
              },
              {
                type: "string",
                label: "Pattern",
                name: "pattern",
                list: true,
              },
            ],
          },
          {
            type: "string",
            label: "Contribute Title",
            name: "contributeTitle",
          },
          {
            type: "object",
            label: "Goals",
            name: "goals",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: item.title || "Goals Item",
              }),
            },
            fields: [
              {
                type: "string",
                label: "Title",
                name: "title",
              },
              {
                type: "rich-text",
                label: "Text",
                name: "text",
              },
            ],
          },
          {
            type: "string",
            label: "Principles Title",
            name: "principlesTitle",
          },
          {
            type: "rich-text",
            label: "Principles First Paragraph",
            name: "principlesFirstParagraph",
          },
          {
            type: "rich-text",
            label: "Principles Highlighted Paragraph",
            name: "principlesHighlightedParagraph",
          },
          {
            type: "rich-text",
            label: "Principles Second Paragraph",
            name: "principlesSecondParagraph",
          },
          {
            type: "object",
            label: "We Will",
            name: "weWill",
            fields: [
              {
                type: "object",
                label: "Items",
                name: "items",
                list: true,
                ui: {
                  itemProps: (item) => ({
                    label: item.text || "Items Item",
                  }),
                },
                fields: [
                  {
                    type: "string",
                    label: "Text",
                    name: "text",
                  },
                  {
                    type: "object",
                    label: "Sub Items",
                    name: "sub_items",
                    list: true,
                    required: false,
                    ui: {
                      itemProps: (item) => ({
                        label: item.text || "Sub Items Item",
                      }),
                    },
                    fields: [
                      {
                        type: "string",
                        label: "Text",
                        name: "text",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "object",
            label: "We Will Not",
            name: "weWillNot",
            fields: [
              {
                type: "object",
                label: "Items",
                name: "items",
                list: true,
                ui: {
                  itemProps: (item) => ({
                    label: item.text || "Items Item",
                  }),
                },
                fields: [
                  {
                    type: "string",
                    label: "Text",
                    name: "text",
                  },
                  {
                    type: "object",
                    label: "Sub Items",
                    name: "sub_items",
                    list: true,
                    required: false,
                    ui: {
                      itemProps: (item) => ({
                        label: item.text || "Sub Items Item",
                      }),
                    },
                    fields: [
                      {
                        type: "string",
                        label: "Text",
                        name: "text",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "rich-text",
            label: "Promises Paragraph",
            name: "promisesParagraph",
          },
          {
            type: "string",
            label: "Structure Title",
            name: "structureTitle",
          },
          {
            type: "rich-text",
            label: "Structure First Paragraph",
            name: "structureFirstParagraph",
          },
          {
            type: "rich-text",
            label: "Structure Second Paragraph",
            name: "structureSecondParagraph",
          },
        ],
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
      },
      {
        label: 'Blog',
        name: 'blog',
        path: 'src/content/blog',
        format: 'md',
        fields: [
          {
            type: 'string',
            name: 'title',
            label: 'Title',
            required: true,
          },
          {
            type: 'string',
            name: 'author',
            label: 'Author',
            required: true,
          },
          {
            type: 'datetime',
            name: 'publishDate',
            label: 'Publish Date',
            required: true,
            ui: {
              dateFormat: 'MMMM D, YYYY',
            },
          },
          {
            type: "image",
            name: "image",
            label: "Image",
          },
          {
            type: 'string',
            name: 'excerpt',
            label: 'Excerpt',
            required: true,
            ui: {
              component: 'textarea',
            },
          },
          {
            type: 'rich-text',
            name: 'body',
            label: 'Body',
            isBody: true,
          },
        ],
      },
      {
        label: "Questions",
        name: "questions",
        path: "src/content/questions",
        format: "md",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Question",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Answer",
            isBody: true,
          },
        ],
      },
      {
        label: "Projects",
        name: "projects",
        path: "src/content/projects",
        format: "md",
        fields: [
          {
            type: "string",
            name: "name",
            label: "Name",
          },
          {
            type: "rich-text",
            name: "shortDescription",
            label: "Short Description",
          },
          {
            type: "rich-text",
            name: "summary",
            label: "Summary",
          },
          {
            type: "string",
            name: "maintainers",
            label: "Maintainers",
            list: true,
          },
          {
            type: "object",
            name: "links",
            label: "Links",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: item.to || "Links Item",
              }),
            },
            fields: [
              {
                type: "string",
                name: "to",
                label: "To",
              },
              {
                type: "string",
                name: "href",
                label: "Href",
              },
            ],
          },
          {
            type: "object",
            name: "roadmap",
            label: "Roadmap",
            fields: [
              {
                type: "string",
                name: "type",
                label: "Type",
                options: ["past-present-future", "journey"],
              },
              {
                type: "object",
                name: "recently",
                label: "Recently",
                list: true,
                ui: {
                  itemProps: (item) => ({
                    label: item.title || "Recently Item",
                  }),
                },
                fields: [
                  {
                    type: "string",
                    name: "title",
                    label: "Title",
                  },
                  {
                    type: "rich-text",
                    name: "description",
                    label: "Description",
                  },
                  {
                    type: "string",
                    name: "href",
                    label: "Href",
                  },
                ],
              },
              {
                type: "object",
                name: "currently",
                label: "Currently",
                list: true,
                ui: {
                  itemProps: (item) => ({
                    label: item.title || "Currently Item",
                  }),
                },
                fields: [
                  {
                    type: "string",
                    name: "title",
                    label: "Title",
                  },
                  {
                    type: "rich-text",
                    name: "description",
                    label: "Description",
                  },
                  {
                    type: "string",
                    name: "href",
                    label: "Href",
                  },
                ],
              },
              {
                type: "object",
                name: "next",
                label: "Next",
                list: true,
                ui: {
                  itemProps: (item) => ({
                    label: item.title || "Next Item",
                  }),
                },
                fields: [
                  {
                    type: "string",
                    name: "title",
                    label: "Title",
                  },
                  {
                    type: "rich-text",
                    name: "description",
                    label: "Description",
                  },
                  {
                    type: "string",
                    name: "href",
                    label: "Href",
                  },
                ],
              },
              {
                type: "object",
                name: "discussions",
                label: "Discussions",
                list: true,
                ui: {
                  itemProps: (item) => ({
                    label: item.title || "Discussions Item",
                  }),
                },
                fields: [
                  {
                    type: "string",
                    name: "title",
                    label: "Title",
                  },
                  {
                    type: "string",
                    name: "href",
                    label: "Href",
                  },
                ],
              },
              {
                type: "object",
                name: "phases",
                label: "Phases",
                list: true,
                ui: {
                  itemProps: (item) => ({
                    label: item.name || "Phases Item",
                  }),
                },
                fields: [
                  {
                    type: "string",
                    name: "name",
                    label: "Name",
                  },
                  {
                    type: "string",
                    name: "color",
                    label: "Color",
                  },
                  {
                    type: "rich-text",
                    name: "description",
                    label: "Description",
                  },
                  {
                    type: "string",
                    name: "start",
                    label: "Start",
                  },
                  {
                    type: "object",
                    name: "milestones",
                    label: "Milestones",
                    list: true,
                    ui: {
                      itemProps: (item) => ({
                        label: item.title || "Milestones Item",
                      }),
                    },
                    fields: [
                      {
                        type: "string",
                        name: "when",
                        label: "When",
                      },
                      {
                        type: "string",
                        name: "title",
                        label: "Title",
                      },
                      {
                        type: "rich-text",
                        name: "description",
                        label: "Description",
                      },
                      {
                        type: "string",
                        name: "link",
                        label: "Link",
                      },
                      {
                        type: "string",
                        name: "pattern",
                        label: "Pattern",
                        list: true,
                      },
                    ],
                  },
                  {
                    type: "object",
                    name: "packages",
                    label: "Packages",
                    list: true,
                    ui: {
                      itemProps: (item) => ({
                        label: item.title || "Packages Item",
                      }),
                    },
                    fields: [
                      {
                        type: "string",
                        name: "title",
                        label: "Title",
                      },
                      {
                        type: "rich-text",
                        name: "description",
                        label: "Description",
                      },
                      {
                        type: "string",
                        name: "link",
                        label: "Link",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "rich-text",
            name: "goal",
            label: "Goal",
            isBody: true,
          },
        ],
      },
      {
        label: "Members",
        name: "members",
        path: "src/content/members",
        format: "md",
        fields: [
          {
            type: "string",
            name: "name",
            label: "Name",
          },
          {
            type: "image",
            name: "logo",
            label: "Logo",
          },
          {
            type: "string",
            name: "website",
            label: "Website",
          },
          {
            type: "string",
            name: "twitter",
            label: "Twitter",
          },
          {
            type: "string",
            name: "github",
            label: "GitHub",
          },
          {
            type: "string",
            name: "discord",
            label: "Discord",
          },
          {
            type: "rich-text",
            name: "description",
            label: "Description",
            isBody: true,
          },
        ],
      },
      {
        label: "Maintainers",
        name: "maintainers",
        path: "src/content/maintainers",
        format: "yaml",
        fields: [
          {
            type: "string",
            name: "maintainerId",
            label: "ID",
          },
          {
            type: "string",
            name: "firstname",
            label: "First Name",
          },
          {
            type: "string",
            name: "lastname",
            label: "Last Name",
          },
          {
            type: "string",
            name: "company",
            label: "Company",
          },
          {
            type: "string",
            name: "role",
            label: "Role",
          },
          {
            type: "string",
            name: "github",
            label: "GitHub",
          },
          {
            type: "string",
            name: "twitter",
            label: "Twitter",
            required: false,
          },
          {
            type: "string",
            name: "linkedIn",
            label: "LinkedIn",
            required: false,
          },
        ],
      },
    ],
  },
});
