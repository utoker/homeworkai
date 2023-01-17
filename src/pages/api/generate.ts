import { type NextApiRequest, type NextApiResponse } from 'next';
import { OpenAIApi } from 'openai';
import { prisma } from '../../server/db/client';
import { Configuration } from 'openai';
import { env } from '../../env/server.mjs';
import { getSession } from 'next-auth/react';

const configuration = new Configuration({
  apiKey: env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

type Data = {
  result?: string;
  error?: string;
};

const generate = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const session = await getSession({ req });
  const { messages } = req.body;
  const { userId } = req.body;
  const subscription = session?.user?.subscription;
  const postCounter = await prisma.postCounter.findUnique({
    where: {
      userId: userId as string,
    },
  });
  const count = postCounter?.count;
  if (count === undefined) {
    res.status(500).json({ error: 'Something went wrong' });
  }
  if (subscription === 'basic' && count && count > 9) {
    res.status(200).json({ result: 'You have reached your limit of 10 posts' });
  }
  if (subscription === 'pro' && count && count > 49) {
    res.status(200).json({ result: 'You have reached your limit of 50 posts' });
  }
  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `You are a super intelligent AI made for helping students with their homework and assessments. \n${messages}`,
      max_tokens: 2048,
      temperature: 0.7,
      top_p: 1,
      n: 1,
      stream: false,
      logprobs: null,
      // stop: "\n",
    });
    if (response.status !== 200) {
      res.status(500).json({ result: 'Something went wrong' });
    }
    // prisma update postCounter +1
    if (count !== undefined) {
      await prisma.postCounter.update({
        where: {
          userId: userId as string,
        },
        data: {
          count: count + 1,
        },
      });
    }
    const result = response?.data?.choices[0]?.text;
    res.status(200).json({ result });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({ error: `${error.message} CATCH` });
  }
};

export default generate;
