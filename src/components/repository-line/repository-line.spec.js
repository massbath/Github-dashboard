import {shallowMount} from '@vue/test-utils'
import {expect} from 'chai'
import RepositoryLine from './repository-line.vue'

describe('RepositoryLine component', () => {
	let repositoryLine

	beforeEach(() => {
		repositoryLine = shallowMount(RepositoryLine, {
			propsData: {
				repository: {
					name: 'repository',
					owner: 'user',
					repositoryUrl: 'http://repository-url',
					branchStatus: 'SUCCESS',
					defaultBranch: 'master',
					statusesList: [{
						jobStatus: 'SUCCESS',
						description: 'build description',
						jobUrl: 'http://build-target-url',
					}],
				},
			},
		})
	})

	describe('Initialization', () => {
		it('should have repository-line name', () => {
			expect(repositoryLine.exists()).to.be.true
		})

		it('should use the color on the line according to the branch status', () => {
			expect(repositoryLine.find('[data-test=badge]').classes()).to.contains('SUCCESS')
		})

		it('should display a way to remove the repository from watched repositories', () => {
			expect(repositoryLine.find('[data-test=trash]').exists()).to.be.true
		})
	})

	describe('Repository link', () => {
		let repositoryLink

		beforeEach(() => {
			repositoryLink = repositoryLine.find('[data-test=link]')
		})

		it('should display a repository link', () => {
			expect(repositoryLink.exists()).to.be.true
		})

		it('should give a repository name to the component', () => {
			expect(repositoryLink.text()).to.equal('repository')
		})

		it('should give a repository url to the component', () => {
			expect(repositoryLink.attributes().href).to.equal('http://repository-url')
		})
	})

	describe('Build statuses', () => {
		let buildStatuses

		beforeEach(() => {
			buildStatuses = repositoryLine.findComponent({name: 'build-statuses'})
		})

		it('should display build statuses', () => {
			expect(buildStatuses.exists()).to.be.true
		})

		it('should give the list of statuses to the component', () => {
			expect(buildStatuses.props().statuses).to.deep.equal([{
				jobStatus: 'SUCCESS',
				description: 'build description',
				jobUrl: 'http://build-target-url',
			}])
		})

		it('should not display build statuses when there is no build status associated with the commit', () => {
			repositoryLine = shallowMount(RepositoryLine, {
				propsData: {
					repository: {
						name: 'repository',
						owner: 'user',
						repositoryUrl: 'http://repository-url',
						branchStatus: 'SUCCESS',
						defaultBranch: 'master',
						statusesList: [],
					},
				},
			})

			buildStatuses = repositoryLine.findComponent({name: 'build-statuses'})
			expect(buildStatuses.exists()).to.be.false
		})
	})
})
