import { describe, it, expect } from "vitest";
import { CreateAppointment } from "./create-appointment";
import { Appointment } from "../entities/appointment";
import { getFutureDate } from "../tests/utils/get-future-date";
import { InMemoryAppointmentsRepository } from '../repositories/in-memory/in-memory-appointments-repository'

describe('Create Appointment', () => {
    it('should be able to create an appointment', () => {
        const startsAt = getFutureDate('2023-06-14')
        const endsAt = getFutureDate('2023-06-15')

        const appointmentsRepository =  new InMemoryAppointmentsRepository()
        const createAppointment = new CreateAppointment(appointmentsRepository)

        expect(createAppointment.execute({
            customer: 'John Doe',
            startsAt,
            endsAt
        })).resolves.toBeInstanceOf(Appointment)
    })

    it('should not be able to create an appointment with overlapping dates', async () => {
        const startsAt = getFutureDate('2023-06-14')
        const endsAt = getFutureDate('2023-06-19')

        const appointmentsRepository =  new InMemoryAppointmentsRepository()
        const createAppointment = new CreateAppointment(appointmentsRepository)

        await createAppointment.execute({
            customer: 'John Doe',
            startsAt,
            endsAt
        })

        expect(createAppointment.execute({
            customer: 'John Doe',
            startsAt: getFutureDate('2023-06-18'),
            endsAt: getFutureDate('2023-06-22')
        })).rejects.toBeInstanceOf(Error)
    })
})