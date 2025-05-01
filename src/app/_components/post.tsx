'use client'

import { useState } from 'react'

import { api } from '~/trpc/react'

export function LatestPost() {
	const [latestPost] = api.cycle.getCurrent.useSuspenseQuery()

	const utils = api.useUtils()
	const [name, setName] = useState('')
	const createCycle = api.cycle.create.useMutation({
		onSuccess: async () => {
			await utils.cycle.invalidate()
			setName('')
		}
	})

	return (
		<div className="w-full max-w-xs">
			{latestPost ? (
				<p className="truncate">
					Your most recent post: {latestPost.startDate.toString()}
				</p>
			) : (
				<p>You have no posts yet.</p>
			)}
			<form
				onSubmit={(e) => {
					e.preventDefault()
					createCycle.mutate()
				}}
				className="flex flex-col gap-2"
			>
				<input
					type="text"
					placeholder="Title"
					value={name}
					onChange={(e) => setName(e.target.value)}
					className="w-full rounded-full bg-white/10 px-4 py-2 text-white"
				/>
				<button
					type="submit"
					className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
					disabled={createCycle.isPending}
				>
					{createCycle.isPending ? 'Submitting...' : 'Submit'}
				</button>
			</form>
		</div>
	)
}
