import { v } from "convex/values"
import { query } from "./_generated/server";

export const getFeaturedEvents = query({
    args: {
        limit: v.optional(v.number()),
    },
    handler: async (ctx, args) => {
        const now = Date.now();

        const events = await ctx.db
            .query("events")
            .withIndex("by_startDate")
            .filter(q => q.gte(q.field("startDate"), now))
            .order("desc")
            .collect()

        // sort the registration count 
        const featured = events
            .sort((a, b) => b.registrationCount - a.registrationCount)
            .slice(0, args.limit || 3);

        return featured;
    }
})

// Get events by location (city/state)
export const getEventsByLocation = query({
    args: {
        city: v.optional(v.string()),
        state: v.optional(v.string()),
        country: v.optional(v.string()),
        limit: v.optional(v.number()),
    },
    handler: async (ctx, args) => {
        const now = Date.now();

        let events = await ctx.db
            .query("events")
            .withIndex("by_startDate")
            .filter(q => q.gte(q.field("startDate"), now))
            .collect()

        if (args.city) {
            events = events.filter((e) => e.city.toLowerCase() === args.city.toLowerCase());
        } else if (args.state) {
            events = events.filter((e) => e.state?.toLowerCase() === args.state.toLowerCase());
        }

        return events.slice(0, args.limit ?? 4)
    }
})

// Get popular events(high rigistration count) 
export const getPopularEvents = query({
    args: {
        limit: v.optional(v.number()),
    },
    handler: async (ctx, args) => {
        const now = Date.now();

        const events = await ctx.db
            .query("events")
            .withIndex("by_startDate")
            .filter(q => q.gte(q.field("startDate"), now))
            .collect()

        // sort by registration count
        const popular = events
            .sort((a, b) => b.registrationCount - a.registrationCount)
            .slice(0, args.limit ?? 6)

        return popular
    }
})
export const getEventsByCategory = query({
    args: {
        category: v.optional(v.number()),
        limit: v.optional(v.number()),
    },
    handler: async (ctx, args) => {
        const now = Date.now();
        const events = await ctx.db
            .query("events")
            .withIndex("by_category", (q) => q.eq("category", args.category))
            .filter((q) => q.gte(q.field("startDate"), now))
            .collect();

        return events.slice(0, args.limit ?? 12);
    },
});


export const getCategoryCounts = query({
    handler: async (ctx) => {
        const now = Date.now()
        const events = await ctx.db
            .query("events")
            .withIndex("by_startDate")
            .filter(q => q.gte(q.field("startDate"), now))
            .collect()

        // Count events per category
        const count = {};
        events.forEach((event) => {
            count[event.category] = (count[event.category] || 0) + 1;
        })

        return count;
    }
})