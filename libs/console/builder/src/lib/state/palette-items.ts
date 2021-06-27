import { PaletteItem, Type } from '@formidable/shared/renderer';

export const paletteItems: PaletteItem[] = [
  {
    type: Type.ROW,
    props: {},
    propDescriptors: [
      {
        type: Type.INPUT,
        props: {
          label: 'classes',
          name: 'classes',
        },
      },
    ],
  },
  {
    type: Type.GROUP,
    props: {},
    propDescriptors: [
      {
        type: Type.INPUT,
        props: {
          label: 'name',
          name: 'name',
        },
        validation: {
          required: true,
        },
      },
      {
        type: Type.INPUT,
        props: {
          label: 'label',
          name: 'label',
        },
      },
    ],
  },
  {
    type: Type.INPUT,
    props: {},
    propDescriptors: [
      {
        type: Type.GROUP,
        props: {
          name: 'props',
        },
        children: [
          {
            type: Type.INPUT,
            props: {
              label: 'label',
              name: 'label',
            },
            validation: {
              required: true,
            },
          },
          {
            type: Type.INPUT,
            props: {
              label: 'name',
              name: 'name',
            },
            validation: {
              required: true,
            },
          },
          {
            type: Type.INPUT,
            props: {
              label: 'classes',
              name: 'classes',
            },
          },
        ],
      },
      {
        type: Type.GROUP,
        props: {
          name: 'validation',
          label: 'validation'
        },
        children: [
          {
            type: Type.INPUT,
            props: {
              label: 'required',
              name: 'required',
            },
          },
          // {
          //   type: Type.TEXTAREA,
          //   props: {
          //     label: 'custom',
          //     name: 'custom',
          //   },
          // },
        ],
      },
    ],
  },
  {
    type: Type.NUMBER,
    props: {},
    propDescriptors: [
      {
        type: Type.INPUT,
        props: {
          label: 'label',
          name: 'label',
        },
        validation: {
          required: true,
        },
      },
      {
        type: Type.INPUT,
        props: {
          label: 'name',
          name: 'name',
        },
        validation: {
          required: true,
        },
      },
      {
        type: Type.INPUT,
        props: {
          label: 'classes',
          name: 'classes',
        },
      },
      // {
      //   type: Type.GROUP,
      //   props: {
      //     name: 'validation',
      //   },
      //   children: [
      //     {
      //       type: Type.CHECKBOX,
      //       props: {
      //         label: 'required',
      //         name: 'required',
      //       },
      //     },
      //     {
      //       type: Type.NUMBER,
      //       props: {
      //         label: 'min',
      //         name: 'min',
      //       },
      //     },
      //     {
      //       type: Type.NUMBER,
      //       props: {
      //         label: 'max',
      //         name: 'max',
      //       },
      //     },
      //     {
      //       type: Type.TEXTAREA,
      //       props: {
      //         label: 'custom',
      //         name: 'custom',
      //       },
      //     },
      //   ],
      // },
    ],
  },
];
