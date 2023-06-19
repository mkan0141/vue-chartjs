import { mount } from '@vue/test-utils'
import LegacyLine from './examples/Line.vue'

describe('LegacyLine', () => {
  const Component = {
    template: '<div><LegacyLine :chartId="chartId" :plugins="plugins" /></div>',
    components: { LegacyLine },
    props: ['chartId', 'plugins']
  }

  it('should render a canvas', () => {
    const wrapper = mount(Component)

    const lineChartEl = wrapper.find('#line-chart')
    expect(lineChartEl.element.id).not.toBe('undefined')
    expect(lineChartEl.exists()).toBe(true)

    const canvasEl = wrapper.find('canvas')
    expect(canvasEl.exists()).toBe(true)
  })

  it('should change id based on prop', () => {
    const wrapper = mount(Component, {
      propsData: { chartId: 'linechartprop' }
    })

    const lineChartEl = wrapper.find('#linechartprop')
    expect(lineChartEl.element.id).not.toBe('undefined')
    expect(lineChartEl.exists()).toBe(true)
  })

  it('should add inline plugins based on prop', () => {
    const testPlugin = {
      id: 'test'
    }

    const wrapper = mount(Component, {
      propsData: { plugins: [testPlugin] }
    })

    expect(wrapper.props().plugins.length).toEqual(1)
  })
})