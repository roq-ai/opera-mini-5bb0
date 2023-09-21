import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware, notificationHandlerMiddleware } from 'server/middlewares';
import { cryptoAssetsValidationSchema } from 'validationSchema/crypto-assets';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  const allowed = await prisma.crypto_assets
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  if (!allowed) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  switch (req.method) {
    case 'GET':
      return getCryptoAssetsById();
    case 'PUT':
      return updateCryptoAssetsById();
    case 'DELETE':
      return deleteCryptoAssetsById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getCryptoAssetsById() {
    const data = await prisma.crypto_assets.findFirst(convertQueryToPrismaUtil(req.query, 'crypto_assets'));
    return res.status(200).json(data);
  }

  async function updateCryptoAssetsById() {
    await cryptoAssetsValidationSchema.validate(req.body);
    const data = await prisma.crypto_assets.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    await notificationHandlerMiddleware(req, data.id);
    return res.status(200).json(data);
  }
  async function deleteCryptoAssetsById() {
    await notificationHandlerMiddleware(req, req.query.id as string);
    const data = await prisma.crypto_assets.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
