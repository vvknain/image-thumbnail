from PIL import Image
from resizeimage import resizeimage  # alternate option to convert image to thumbnail of given size


def convert_to_thumbnail(image_file, size):
    prefix = "http://localhost:5000/"

    path = "static/{}".format(image_file.filename)
    image_file.save(path)

    # thumbnail file name
    filename = "{}_X_{}-{}".format(size, size, image_file.filename)
    thumbnail_path = "static/{}".format(filename)

    thumbnail_image = Image.open(path)

    # any of the below two line can be chosen to convert to thumbnail
    # thumbnail_image = resizeimage.resize_thumbnail(thumbnail_image, [int(size), int(size)])
    thumbnail_image = thumbnail_image.resize((int(size), int(size)))

    thumbnail_image.save(thumbnail_path)

    return "{}{}".format(prefix, thumbnail_path)
