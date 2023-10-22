//
// npm run new:sfc -- --tag=p
//
module.exports = {
  prompt: ({ inquirer, args }) => {
    const questions = [
      // {
      //   type: 'select',
      //   name: 'category',
      //   message: 'Atomic Designのどのカテゴリのコンポーネントを作成しますか?',
      //   choices: ['atoms', 'molecules', 'organisms', 'templates']
      // },
      {
        type: 'input',
        name: 'component_name',
        message:
          'コンポーネント名を決めてください（キャメルケース） 例：BaseButton',
      },
      // {
      //   type: 'input',
      //   name: 'dir',
      //   message: 'どのディレクトリに生成しますか? "src/components/"に続く形で記述してください',
      // },
      {
        type: 'select',
        name: 'have_props',
        message: 'propsは必要ですか?',
        choices: ['yes', 'no'],
      },
      {
        type: 'select',
        name: 'have_hooks',
        message: 'hooksはありますか?',
        choices: ['yes', 'no'],
      },
    ];
    return inquirer.prompt(questions).then((answers) => {
      const { category, component_name, dir, have_props } = answers;
      // const path = `${category}/${ dir ? `${dir}/` : `` }${component_name}`
      const abs_path = `src/components/${component_name}`;
      const type_annotate = have_props ? 'React.FC<Props>' : 'React.FC';
      const props = have_props ? '(props)' : '()';
      const tag = args.tag ? args.tag : 'div';
      // return { ...answers, path, abs_path, type_annotate, props, tag }
      return {
        ...answers,
        component_name,
        abs_path,
        type_annotate,
        props,
        tag,
      };
    });
  },
};
