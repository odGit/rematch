// @flow
export default {
  expose: { select: {} },
  init: ({ select, validate }) => ({
    onModel(model: $model) {
      select[model.name] = {}
      Object.keys(model.selectors || {}).forEach((selectorName: string) => {
        validate([
          [
            typeof model.selectors[selectorName] !== 'function',
            `Selector (${model.name}/${selectorName}) must be a function`
          ]
        ])
        select[model.name][selectorName] = (state: any, ...args) =>
          model.selectors[selectorName](state[model.name], ...args)
      })
    }
  })
}
