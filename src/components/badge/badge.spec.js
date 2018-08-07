import {expect} from 'chai'
import {shallowMount} from '@vue/test-utils'
import Badge from './badge.vue'

describe(`Badge component`, () => {
	describe(`Initialization`, () => {
		it(`should display the content of the slot`, () => {
			const wrapper = shallowMount(Badge, {
				slots: {
					default: [`<span>Slot content</span>`],
				},
			})

			expect(wrapper.text()).to.equal(`Slot content`)
		})
	})
})