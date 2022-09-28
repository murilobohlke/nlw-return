import { PrismaFeedbacksRepository } from './repositories/prisma/prisma_feedbacks_repository';
import { NodemailerMailAdpater } from './adapters/nodemailer/nodemailer_mail_adapter';
import { SubmitFeedbackUseCase } from './use_cases/submit_feedback_use_case';

import express from 'express'

export const routes = express.Router()

routes.post('/feedbacks', async (req, res)=>{
    const {type, comment, screenshot} = req.body

    const prismaFeedbackRepository = new PrismaFeedbacksRepository()
    const nodemailerMailAdapter = new NodemailerMailAdpater()

    const submitFeedbackUseCase = new SubmitFeedbackUseCase(prismaFeedbackRepository, nodemailerMailAdapter)

    await submitFeedbackUseCase.execute({type, comment, screenshot})

    return res.status(201).send()
})