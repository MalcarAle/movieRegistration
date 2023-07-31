const fs = require("fs")
const path = require("path")
const uploadConfig = require("../configs/upload")

class DiskStorage {
  async saveFile(file) {
    await fs.promises.rename(
      path.resolve(uploadConfig.TMP_FOLDER, file), //pegando o arquivo dentro da pasta tmp_folder
      path.resolve(uploadConfig.UPLOADS_FOLDER, file) //levando para a pasta upload
    )
    return file
  }

  async deleteFile(file) {
    const filePath = path.resolve(uploadConfig.UPLOADS_FOLDER, file) //buscando pelo arquivo

    try {
      await fs.promises.stat(filePath)
    } catch {
      return
    }

    await fs.promises.unlink(filePath) //delta o arquivo
  }
}

module.exports = DiskStorage
