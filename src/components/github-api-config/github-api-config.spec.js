import {expect} from 'chai'
import {shallowMount} from '@vue/test-utils'
import GithubApiConfig from './github-api-config.vue'

describe(`GithubApiConfig component`, () => {
	let githubApiConfig

	beforeEach(() => {
		githubApiConfig = shallowMount(GithubApiConfig)
	})

	describe(`Initialization`, () => {
		it(`should have the right component name`, () => {
			expect(githubApiConfig.name()).to.equal(`github-api-config`)
		})

		it(`should display an input`, () => {
			expect(githubApiConfig.find(`input`).exists()).to.be.true
		})
	})
})
