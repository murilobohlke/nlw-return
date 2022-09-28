import { SubmitFeedbackUseCase } from "./submit_feedback_use_case"

const createFeedbackSpy = jest.fn()
const sendMailSpy = jest.fn()

const submitFeedback = new SubmitFeedbackUseCase(
    {create: createFeedbackSpy},
    {sendMail: sendMailSpy}
)

describe('Submit feedback', () => {
    it('should be able to submit a feedback',async ()=>{

        await expect(submitFeedback.execute({
            type:'BUG',
            comment: 'Test',
            screenshot: 'data:image/png;base64 bidbfgibdfigbfdgdgdg'
        })).resolves.not.toThrow()

        expect(createFeedbackSpy).toHaveBeenCalled()
        expect(sendMailSpy).toHaveBeenCalled()
    })

    it('should not be able to submit a feedback without type',async ()=>{

        await expect(submitFeedback.execute({
            type:'',
            comment: 'Test',
            screenshot: 'data:image/png;base64 bidbfgibdfigbfdgdgdg'
        })).rejects.toThrow()
    })

    it('should not be able to submit a feedback without comment',async ()=>{

        await expect(submitFeedback.execute({
            type:'BUG',
            comment: '',
            screenshot: 'data:image/png;base64 bidbfgibdfigbfdgdgdg'
        })).rejects.toThrow()
    })

    it('should not be able to submit a feedback with different image format',async ()=>{

        await expect(submitFeedback.execute({
            type:'BUG',
            comment: 'Test',
            screenshot: 'test.jpg'
        })).rejects.toThrow()
    })
})