import { CertificateModel } from "../schemas/Certificate";

class Certificate {
    static async create({ newCertificate }) {
        const createdCertificate = await CertificateModel.create(newCertificate);
        return createdCertificate;
    }

    static async exists({ object }) {
        const exists = await CertificateModel.exists({ object });
        return exists;
    }

    static async findById({ id }) {
        const certificate = await CertificateModel.findOne({ id });
        return certificate;
    }

    static async findAll({ user_id }) {
        const certificates = await CertificateModel.find({ user_id });
        return certificates;
    }

    static async update({ id }, newCertificate) {
        const updatedCertificate = await CertificateModel.findOneAndUpdate({ id }, newCertificate);
        return updatedCertificate;
    }

    static async delete({ id }) {
        const updatedCertificate = await CertificateModel.findOneAndDelete({ id });
        return updatedCertificate;
    }
}

export { Certificate };
