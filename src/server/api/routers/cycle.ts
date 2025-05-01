import { z } from 'zod'

import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc'

export const cycleRouter = createTRPCRouter({
	create: protectedProcedure.mutation(async ({ ctx }) => {
		return ctx.db.cycle.create({
			data: {
				userId: ctx.session.user.id
			}
		})
	}),

	getCurrent: protectedProcedure.query(async ({ ctx }) => {
		const cycle = await ctx.db.cycle.findFirst({
			orderBy: {
				startDate: 'desc'
			}
		})

		return cycle ?? null
	})
})
