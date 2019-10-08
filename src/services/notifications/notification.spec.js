import {expect} from 'chai'
import {stub} from 'sinon'
import {notificationApi} from './notification'

describe('NotificationAPI', () => {
	let stubs

	beforeEach(() => {
		const Notification = stub()
		Notification.requestPermission = stub()

		stubs = {Notification}
	})

	it('should create a notification when user gave its permission', () => {
		stubs.Notification.permission = 'granted'

		const api = notificationApi(stubs)
		api.notify('Some notification')

		expect(stubs.Notification).to.have.been.calledWith('Some notification')
	})

	it('should not create notification when user refused notifications', () => {
		stubs.Notification.permission = 'denied'

		const api = notificationApi(stubs)
		api.notify('Some notification')

		expect(stubs.Notification).not.to.have.been.called
	})
})
