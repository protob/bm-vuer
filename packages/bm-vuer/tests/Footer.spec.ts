import { mount } from '@vue/test-utils'
//import Footer from '../src/components/Footer.vue'
// 
// The component to test
const Footer = {
  template: '<footer class="footer">{{ msg }}</footer>',
  props: ['msg']
}

test('displays message', () => {
  const wrapper = mount(Footer, {
    props: {
      msg: 'Hello world'
    }
  })

  // Assert the rendered text of the component
    expect(wrapper.text()).toContain('Hello world')
    expect(wrapper.classes()).toContain("footer")
})
