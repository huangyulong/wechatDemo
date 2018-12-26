Page({
  data: {
    title: '这是用来测试viewScroll',
    view: "third",
    arrView: ["first", "second", "third", "forth", "first", "second", "third", "forth", "first", "second"],
    swipers: [
      {label: 'first', color: 'blue'},
      { label: 'second', color: 'red' },
      { label: 'third', color: 'green' },
      {label: 'forth', color: 'yellow'}
    ],
    nodes: [
      {
        name: 'div',
        attrs: {
          class: 'nodeDiv'
        },
        children: [
          {
            type: 'text',
            text: 'rich-text'
          }
        ]
      }
    ]
  },

  changeView: function() {
    console.log(this.data.view)
    let i = parseInt(Math.random() * 10)
    this.setData({
      view: this.data.arrView[i]
    },() => {
      console.log(this.data.view)
    })
  }
})